# frozen_string_literal: true

require "test_helper"

class API::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, password: "welcome12345")
    @author = create(:user, organization: @organization)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "published")
    @headers = headers(@organization)
  end

  def test_user_should_be_able_to_access_article_if_password_protection_is_disabled
    get api_public_article_path(@article.slug), headers: @headers
    assert_response :success
  end

  def test_user_must_be_authenticated_if_password_protection_is_enabled
    @organization.update(is_password_protection_enabled: true)
    get api_public_article_path(@article.slug), headers: headers(@organization.reload)
    assert_response :success
  end

  def test_only_published_article_should_be_displayed_to_user
    @article.update(status: "draft")
    get api_public_article_path(@article.slug), headers: @headers
    assert_response :not_found

    @article.update(status: "published")
    get api_public_article_path(@article.slug), headers: @headers
    assert_response :success
  end

  def test_user_must_be_able_to_access_if_there_is_valid_authentication_token_when_password_protection_is_enabled
    @organization.update(is_password_protection_enabled: true)
    get api_public_article_path(@article.slug), headers: headers(@organization.reload, "X-Auth-Token" => "invalid")
    assert_response :unauthorized
  end

  def test_total_visit_count_should_be_increased_when_user_access_article
    assert_difference "@article.visits.sum(:count)", 1 do
      get api_public_article_path(@article.slug), headers: @headers
    end
  end

  def test_new_visit_should_be_created_when_user_access_article_for_the_first_time_in_a_day
    assert_difference "Visit.count", 1 do
      get api_public_article_path(@article.slug), headers: @headers
    end
  end

  def test_searching_article_based_on_title
    get api_public_articles_path, params: { query: @article.title }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end
end
