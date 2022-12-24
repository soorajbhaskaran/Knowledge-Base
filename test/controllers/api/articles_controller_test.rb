# frozen_string_literal: true

require "test_helper"

class API::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "published")
    @visits = create(:visit, article: @article)
    @headers = headers(@organization)
  end

  def test_should_list_all_articles
    get "/api/articles/page/1", params: { query: "" }, headers: @headers
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

  def test_should_list_all_articles_based_on_status
    get "/api/articles/page/1", params: { status: "published", query: "" },
      headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, @author.articles.published.count
  end

  def test_search_article_based_on_article_title
    article = create(:article, title: "Test article", author: @author, category: @category)
    get "/api/articles/page/1", params: { query: "test" }, headers: @headers
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

  def test_sorting_of_articles_based_on_articles_index
    article1 = create(:article, title: "Test article 1", author: @author, category: @category)
    articles = [article1.as_json, @article.as_json]
    patch sort_api_articles_path, params: { articles: articles }, headers: @headers
    assert_equal @article.reload.position, 2
  end

  def test_changing_category_of_articles
    article1 = create(:article, title: "Test article 1", author: @author, category: @category)
    articles_ids = [article1.id, @article.id]
    patch change_category_api_articles_path, params: { articles_ids: articles_ids, category_id: @category.id },
      headers: @headers
    assert_response :success
    assert_equal @article.reload.category_id, @category.id
  end

  def test_should_list_every_visit_of_an_article
    get visits_api_article_path(@article.id), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["visits"].length, @article.visits.count
  end

  def test_updating_article_should_remove_existing_schedules_of_articles
    schedule = create(:schedule, article: @article, status: "draft")
    patch api_article_path(@article.id), params: { article: { title: "Updated title" }
    }, headers: @headers
    assert_response :success
    assert_nil Schedule.find_by(id: schedule.id)
  end

  def test_drafted_articles_cannot_be_drafted_again_if_there_are_no_publish_schedule
    @article.update(status: "draft")
    patch api_article_path(@article.id), params: { article: { status: "draft" }
    }, headers: @headers
    assert_response :unprocessable_entity
  end

  def test_drafted_article_can_be_drafted_again_if_there_is_publish_schedule
    @article.update(status: "draft")
    create(:schedule, article: @article, status: "published")
    patch api_article_path(@article.id), params: { article: { status: "draft" }
    }, headers: @headers
    assert_response :success
  end
end
