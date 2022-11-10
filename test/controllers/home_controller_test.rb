# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @redirection = create(:redirection, author: @user)
  end

  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_should_redirect_to_path_if_from_path_exists
    get "/#{@redirection.from_path}"
    assert_redirected_to "/#{@redirection.to_path}"
  end
end
