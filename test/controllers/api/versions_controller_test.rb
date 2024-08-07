# frozen_string_literal: true

require "test_helper"

class API::VersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "published")
    @headers = headers(@organization)
    @article.update(title: "Updated title", content: "Updated content")
    @article.update(title: "Updated title 2", content: "Updated content 2")
  end

  def test_list_all_versions_of_articles
    get api_versions_path, params: { article_id: @article.id }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @article.reload.versions.count, response_json["versions"].length
  end

  def test_should_show_version
    get api_version_path(@article.versions.last.id), params: { article_id: @article.id }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["version"]["title"], @article.versions.last.reify.title
    assert_equal response_json["version"]["content"], @article.versions.last.reify.content
  end

  def test_should_allow_to_restore_version
    test_version_id = @article.versions.last.id
    assert_difference "Article.count", 0 do
      patch restore_api_version_path(test_version_id), params: { article_id: @article.id }, headers: @headers
    end
    assert_response :success
    assert_equal @article.reload.title, @article.versions.find(test_version_id).reify.title
  end

  def test_restored_version_should_be_draft
    test_version_id = @article.versions.last.id
    patch restore_api_version_path(test_version_id), params: { article_id: @article.id }, headers: @headers
    assert_response :success
    assert_equal "draft", @article.reload.status
  end

  def test_versions_are_retrieved_in_desc_order
    get api_versions_path, params: { article_id: @article.id }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @article.reload.versions.count, response_json["versions"].length
    assert_equal @article.versions.last.id, response_json["versions"].first["id"]
  end

  def test_versions_cannot_be_restored_if_category_is_not_present
    patch api_article_path(@article.id), params: { article: { title: "Updated title" }
    }, headers: @headers
    test_version_id = @article.versions.last.id
    category = create(:category, author: @author)
    patch change_category_api_articles_path, params: { articles_ids: [@article.id], category_id: category.id },
      headers: @headers
    assert_response :success
    @category.destroy
    assert_difference "Article.count", 0 do
      patch restore_api_version_path(test_version_id), params: { article_id: @article.id }, headers: @headers
    end
    assert_response :not_found
  end
end
