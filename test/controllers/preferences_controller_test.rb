# frozen_string_literal: true

require "test_helper"

class PreferencesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @author = create(:user)
    @preference = create(:preference)
    @headers = headers()
  end

  def test_should_show_the_proper_preference
    get preference_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["preference"]["id"], @preference.id
  end

  def test_should_update_preference
    patch preference_path, params: { preference: { name: "Updated", password: "welcome12345" } }, headers: @headers
    assert_response :success
    assert_equal "Updated", @preference.reload.name
  end

  def test_users_must_be_able_authenticate_with_valid_preference_password
    put preference_path, params: { preference: { password: "welcome12345" } }, headers: @headers
    assert_response :success
    assert @preference.reload.authenticate("welcome12345")
  end
end
