# frozen_string_literal: true

require "test_helper"

class Public::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @current_organization = create(:organization, password: "password12345", is_password_protection_enabled: true)
    @headers = headers(@current_organization)
  end

  def test_user_must_be_authenticated_if_password_protection_is_enabled
    post api_public_session_path, params: { session: { password: "password12345" } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["authentication_token"], @current_organization.authentication_token
  end

  def test_should_not_authenticate_user_with_invalid_password_if_password_protection_is_enabled
    post api_public_session_path, params: { session: { password: "wrong" } }, headers: @headers
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], t("session.incorrect_credentials")
  end
end
