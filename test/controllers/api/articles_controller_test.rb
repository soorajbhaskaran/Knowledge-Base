# frozen_string_literal: true

require "test_helper"
require "json"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "published")
    @headers = headers(@organization)
  end

  def test_should_list_all_articles
    get api_articles_path, params: { query: "" }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, @author.articles.count
  end

  def test_should_create_new_article
    assert_difference "Article.count", 1 do
      post api_articles_path, params: {
        article: {
          title: "Test article", content: "This is a test article content",
          category_id: @category.id, author_id: @author.id
        }
      }, headers: @headers
    end
    assert_response :success
  end

  def test_should_update_article
    patch api_article_path(@article.id), params: { article: { title: "Updated title" }
    }, headers: @headers
    assert_response :success
  end

  def test_should_delete_article
    delete api_article_path(@article.id), headers: @headers
    assert_response :success
  end

  def test_should_show_article
    get api_article_path(@article.id), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["article"]["title"], @article.title
  end

  def test_should_list_all_articles_based_on_status_and_categories_ids
    get api_articles_path, params: { status: "published", categories_ids: JSON.unparse([@category.id]), query: "" },
      headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, @author.articles.count
  end

  def test_search_article_based_on_article_title
    article = create(:article, title: "Test article", author: @author, category: @category)
    get api_articles_path, params: { query: "test" }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].last["title"], article.title
  end

  def test_filtering_articles_based_on_category
    article = create(:article, title: "Test article", author: @author, category: @category)
    post filter_api_articles_path, params: { categories_ids: [@category.id], status: "draft" }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].last["id"], article.id
  end
end
