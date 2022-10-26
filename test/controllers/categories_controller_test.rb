# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @article1 = create(:article, category: @category)
    @article2 = create(:article, category: @category, status: "published")
  end

  def test_should_list_all_categories
    get categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, Category.count
  end

  def test_should_list_all_category_articles_by_articles_status
    get categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].first["articles"]["published"].first["id"], @article2.id
    assert_equal response_json["categories"].first["articles"]["draft"].first["id"], @article1.id
  end

  def test_should_give_valid_articles_count
    get categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].first["articles_count"], @category.articles.count
  end

  def test_should_create_new_category
    assert_difference "Category.count", 1 do
      post categories_path, params: { category: { title: "Test category" } }
    end
    assert_response :success
  end

  def test_should_update_category
    patch category_path(@category), params: { category: { title: "Updated" } }
    assert_response :success
    assert_equal "Updated", @category.reload.title
  end

  def test_should_delete_category_if_articles_count_is_zero
    category = create(:category)
    assert_difference "Category.count", -1 do
      delete category_path(category)
    end
    assert_response :success
  end

  def test_should_transfer_category_articles_to_another_category_before_deleting
    category = create(:category)
    article = create(:article, category: category)
    assert_difference "Category.count", -1 do
      delete category_path(category), params: { new_category_id: @category.id }
    end
    assert_response :success
    assert_equal @category.id, article.reload.category.id
  end

  def test_should_create_new_general_category_if_category_count_is_one_when_deleting
    assert_difference "Category.count", 0 do
      delete category_path(@category)
    end
    assert_response :success
    assert_equal "General", Category.first.title
  end

  def test_articles_count_should_be_consistent_on_deletion_of_category
    category = create(:category)
    article = create(:article, category: category)
    assert_difference "Category.count", -1 do
      delete category_path(category), params: { new_category_id: @category.id }
    end
    assert_response :success
    assert_equal @category.articles_count, 2
  end

  def test_reordering_of_category_field_based_on_position
    category1 = create(:category)
    category2 = create(:category)
    category1.update(position: 2)
    category2.update(position: 1)
    @category.update(position: 3)
    get categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"][0]["id"], category2.id
    assert_equal response_json["categories"][1]["id"], category1.id
    assert_equal response_json["categories"][2]["id"], @category.id
  end
end
