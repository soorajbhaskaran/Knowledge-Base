# frozen_string_literal: true

require "test_helper"

class UserServiceTest < ActiveSupport::TestCase
  def setup
    organization = create(:organization)
  end

  def test_should_create_user
    assert_difference "User.count", 1 do
      user_service.process!
    end
    assert_equal "Oliver", User.first.first_name
  end

  private

    def user_service
      Seeder::UserService.new
    end
end
