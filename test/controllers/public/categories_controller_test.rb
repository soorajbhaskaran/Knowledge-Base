# frozen_string_literal: true

require "test_helper"

class Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
    @preference = create(:preference, password: "password12345")
    @headers = headers(@preference)
  end

  def test_user_must_be_authenticated_if_password_protection_is_enabled
    @preference.update(is_password_protection_enabled: true)
    get public_categories_path, headers: headers(@preference.reload)
    assert_response :success
  end

  def test_user_should_be_able_to_access_categories_if_password_protection_is_disabled
    @preference.update(is_password_protection_enabled: false)
    get public_categories_path, headers: @headers
    assert_response :success
  end

  def test_only_categories_with_published_articles_should_be_returned
    create(:article, author: @author, category: @category, status: "published")
    get public_categories_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, 1
  end
end
