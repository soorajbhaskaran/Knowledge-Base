# frozen_string_literal: true

module Seeder
  class OrganizationService < BaseService
    def process!
      create_organization!
    end

    private

      def create_organization!
        Organization.create! organization_attributes
      end

      def organization_attributes
        organization_attributes = {
          name: "Spinkart",
          password: "welcome123",
          password_confirmation: "welcome123",
          is_password_protection_enabled: false
        }
      end
  end
end
