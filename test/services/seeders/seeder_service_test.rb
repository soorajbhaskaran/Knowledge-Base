# frozen_string_literal: true

require "test_helper"

class SeederServiceTest < ActiveSupport::TestCase
  def test_seeder_should_seed_data
    seeder_service.process!
    assert_equal 60, Article.count
    assert_equal 6, Category.count
    assert_equal 1, User.count
    assert_equal 1, Organization.count
  end

  private

    def seeder_service
      Seeder::SeederService.new
    end
end
