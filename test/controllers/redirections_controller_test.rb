# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
  end

  def test_should_list_all_redirections
    get redirections_path
    assert_response :success
    response_json = response.parsed_body
    all_redirections = response_json["redirections"]
    assert_equal all_redirections.length, Redirection.count
  end

  def test_should_create_new_redirection
    assert_difference "Redirection.count", 1 do
      post redirections_path, params: {
        redirection: {
          from_path: "test", to_path: "test"
        }
      }
    end
    assert_response :success
  end

  def test_should_update_redirection
    patch redirection_path(@redirection), params: { redirection: { from_path: "updated" } }
    assert_response :success
    assert_equal "updated", @redirection.reload.from_path
  end

  def test_should_delete_redirection
    assert_difference "Redirection.count", -1 do
      delete redirection_path(@redirection)
    end
    assert_response :success
  end
end
