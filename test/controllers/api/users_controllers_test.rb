# frozen_string_literal: true

require "test_helper"
class API::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@organization)
  end

  def test_show_user_details
    get api_user_path, headers: @headers
    assert_response :success
  end

  def test_update_user_details
    put api_user_path, params: { user: { info: false } }, headers: @headers
    assert_equal false, @user.reload.info
  end
end
