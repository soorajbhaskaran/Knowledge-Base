# frozen_string_literal: true

require "test_helper"

class Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "published")
    @preference = create(:preference, password: "password12345")
    @headers = headers(@preference)
  end

  def test_user_should_be_able_to_access_article_if_password_protection_is_disabled
    get api_public_article_path(@article.slug), headers: @headers
    assert_response :success
  end

  def test_user_must_be_authenticated_if_password_protection_is_enabled
    @preference.update(is_password_protection_enabled: true)
    get api_public_article_path(@article.slug), headers: headers(@preference.reload)
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
    @preference.update(is_password_protection_enabled: true)
    get api_public_article_path(@article.slug), headers: headers(@preference.reload, "X-Auth-Token" => "invalid")
    assert_response :unauthorized
  end
end