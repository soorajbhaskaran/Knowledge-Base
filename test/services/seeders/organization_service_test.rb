# frozen_string_literal: true

require "test_helper"

class OrganizationServiceTest < ActiveSupport::TestCase
  def test_should_create_organization
    assert_difference "Organization.count", 1 do
      organization_service.process!
    end
    assert_equal "Spinkart", Organization.last.name
  end

  private

    def organization_service
      Seeder::OrganizationService.new
    end
end
