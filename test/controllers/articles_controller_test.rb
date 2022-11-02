# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "published")
    @headers = headers()
  end

  def test_should_list_all_articles
    get articles_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, @author.articles.count
  end

  def test_should_create_new_article
    assert_difference "Article.count", 1 do
      post articles_path, params: {
        article: {
          title: "Test article", content: "This is a test article content",
          category_id: @category.id, author_id: @author.id
        }
      }, headers: @headers
    end
    assert_response :success
  end

  def test_should_update_draft_article
    patch article_path(@article.id), params: {
      status: "draft", article: { title: "Updated title" }
    }, headers: @headers
    assert_response :success
  end

  def test_should_update_published_article
    patch article_path(@article.slug), params: {
      status: "published", article: { title: "Updated title", slug: "title" }
    }, headers: @headers
    assert_response :success
  end

  def test_should_delete_draft_article
    delete article_path(@article.id), params: { status: "draft" }, headers: @headers
    assert_response :success
  end

  def test_should_delete_published_article
    delete article_path(@article.slug), params: { status: "published" }, headers: @headers
    assert_response :success
  end

  def test_should_list_all_articles_based_on_status_and_categories_ids
    get articles_path, params: { status: "published", categories_ids: [@category.id] }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, @author.articles.count
  end

  def test_search_article_based_on_article_title
    article = create(:article, title: "Test article", author: @author, category: @category)
    get search_articles_path, params: { query: "test" }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].last["title"], article.title
  end

  def test_search_article_based_on_article_title_and_category
    article = create(:article, title: "Test article", author: @author, category: @category)
    get search_articles_path, params: { query: "test", categories_ids: [@category.id] }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].last["title"], article.title
  end

  def test_filtering_articles_based_on_category
    article = create(:article, title: "Test article", author: @author, category: @category)
    post filter_articles_path, params: { categories_ids: [@category.id], status: "draft" }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].last["id"], article.id
  end
end
