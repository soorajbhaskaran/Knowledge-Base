# frozen_string_literal: true

require "test_helper"

class CategoriesServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_should_create_categories
    assert_difference "Category.count", categories_service.categories_count do
      categories_service.process!
    end
  end

  private

    def categories_service
      Seeder::CategoriesService.new
    end
end
