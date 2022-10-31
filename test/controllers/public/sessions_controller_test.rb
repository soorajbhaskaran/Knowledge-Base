# frozen_string_literal: true

require "test_helper"

class Public::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference, password: "password12345")
    @headers = headers(@preference)
  end

  def test_should_authenticate_user_with_valid_password
    post public_sessions_path, params: { session: { password: "password12345" } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["authentication_token"], @preference.authentication_token
  end

  def test_should_not_authenticate_user_with_invalid_password
    post public_sessions_path, params: { session: { password: "wrong" } }, headers: @headers
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], t("session.incorrect_credentials")
  end
end
