# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @category = create(:category)
    @article = create(:article, author: @author, category: @category, status: "published")
  end

  def test_should_list_all_articles
    get articles_path
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
      }
    end
    assert_response :success
  end

  def test_should_update_article
    put article_path(@article.slug), params: { article: { title: "Updated" } }
    assert_response :success
    response_json = response.parsed_body
    @article.reload
    assert_equal @article.title, "Updated"
  end

  def test_should_delete_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.slug)
    end
    assert_response :success
  end
end
