# frozen_string_literal: true

require "test_helper"

class PreferencesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference)
  end

  def test_should_show_the_proper_preference
    get preference_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["preference"]["id"], @preference.id
  end

  def test_should_update_preference
    patch preference_path(@preference), params: { preference: { name: "Updated" } }
    assert_response :success
    assert_equal "Updated", @preference.reload.name
  end

  def test_users_must_be_able_authenticate_with_valid_preference_password
    patch preference_path(@preference), params: { preference: { password: "123456" } }
    assert_response :success
    assert @preference.reload.authenticate("123456")
  end
end
