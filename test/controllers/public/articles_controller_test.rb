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
    get public_article_path(@article.slug), headers: @headers
    assert_response :success
  end

  def test_user_must_be_authenticated_if_password_protection_is_enabled
    @preference.update(is_password_protection_enabled: true)
    get public_article_path(@article.slug), headers: headers(@preference.reload)
    assert_response :success
  end
end
