# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @category = create(:category)
    @article = create(:article, author: @author, category: @category, status: "published")
    @headers = headers(@article.author)
  end

  def test_should_list_all_articles
    get articles_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    all_articles = response_json["articles"]

    draft_articles_count = Article.where(status: "draft").count
    published_articles_count = Article.where(status: "published").count

    assert_equal all_articles["draft"].length, draft_articles_count
    assert_equal all_articles["published"].length, published_articles_count
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
end
