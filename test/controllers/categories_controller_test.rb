# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
    @article1 = create(:article, category_id: @category.id, author_id: @author.id)
    @article2 = create(:article, category_id: @category.id, status: "published", author_id: @author.id)
    @headers = headers()
  end

  def test_every_category_should_have_one_author
    get categories_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].first["author_id"], @category.author.id
  end

  def test_should_list_all_categories
    get categories_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, @author.categories.count
  end

  def test_should_list_all_category_articles_by_article_status
    get categories_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].first["articles"]["published"].first["id"], @article2.id
    assert_equal response_json["categories"].first["articles"]["draft"].first["id"], @article1.id
  end

  def test_should_give_valid_articles_count
    get categories_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].first["articles_count"], @category.articles.count
  end

  def test_should_create_new_category
    assert_difference "Category.count", 1 do
      post categories_path, params: { category: { title: "Test category" } }, headers: @headers
    end
    assert_response :success
  end

  def test_should_update_category
    patch category_path(@category), params: { category: { title: "Updated" } }, headers: @headers
    assert_response :success
    assert_equal "Updated", @category.reload.title
  end

  def test_should_delete_category_if_articles_count_is_zero
    category = create(:category, author: @author)
    assert_difference "Category.count", -1 do
      delete category_path(category), headers: @headers
    end
    assert_response :success
  end

  def test_should_transfer_category_articles_to_another_category_before_deleting
    category = create(:category, author: @author)
    article = create(:article, category: category, author: @author)
    assert_difference "Category.count", -1 do
      delete category_path(category), params: { new_category_id: @category.id }, headers: @headers
    end
    assert_response :success
    assert_equal @category.id, article.reload.category.id
  end

  def test_should_create_new_general_category_if_category_count_is_one_when_deleting
    assert_difference "Category.count", 0 do
      delete category_path(@category), headers: @headers
    end
    assert_response :success
    assert_equal "General", @author.categories.reload.first.title
  end

  def test_articles_count_should_be_consistent_on_deletion_of_category
    category = create(:category, author: @author)
    article = create(:article, category: category)
    assert_difference "Category.count", -1 do
      delete category_path(category), params: { new_category_id: @category.id }, headers: @headers
    end
    assert_response :success
    assert_equal @category.reload.articles_count, 3
  end

  def test_reordering_of_category_field_based_on_position
    category1 = create(:category, author: @author)
    category2 = create(:category, author: @author)
    category1.update(position: 2)
    category2.update(position: 1)
    @category.update(position: 3)
    get categories_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"][0]["id"], category2.id
    assert_equal response_json["categories"][1]["id"], category1.id
    assert_equal response_json["categories"][2]["id"], @category.id
  end

  def test_search_category_based_on_category_title
    category = create(:category, title: "Test category", author: @author)
    get search_categories_path, params: { query: "test" }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].last["id"], category.id
  end
end
