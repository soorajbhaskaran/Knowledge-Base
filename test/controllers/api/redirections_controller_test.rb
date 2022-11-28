# frozen_string_literal: true

require "test_helper"

class API::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @redirection = create(:redirection, author: @author)
    @headers = headers(@organization)
  end

  def test_should_list_all_redirections
    get api_redirections_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    all_redirections = response_json["redirections"]
    assert_equal all_redirections.length, @author.redirections.count
  end

  def test_should_create_new_redirection
    assert_difference "Redirection.count", 1 do
      post api_redirections_path, params: {
        redirection: {
          from_path: "test1", to_path: "test2", author: @author
        }
      }, headers: @headers
    end
    assert_response :success
  end

  def test_should_update_redirection
    patch api_redirection_path(@redirection), params: { redirection: { from_path: "updated" } }, headers: @headers
    assert_response :success
    assert_equal "updated", @redirection.reload.from_path
  end

  def test_should_delete_redirection
    assert_difference "Redirection.count", -1 do
      delete api_redirection_path(@redirection), headers: @headers
    end
    assert_response :success
  end
end
