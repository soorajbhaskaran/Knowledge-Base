# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    @headers = headers(:user)
  end
end
