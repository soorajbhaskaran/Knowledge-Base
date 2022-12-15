# frozen_string_literal: true

module Seeder
  class UserService < BaseService
    def process!
      create_user!
    end

    private

      def create_user!
        current_organization.users.create! user_attributes
      end

      def user_attributes
        user_attributes = {
          email: "oliver@example.com",
          first_name: "Oliver",
          last_name: "Smith",
          password: "welcome",
          password_confirmation: "welcome",
          role: "super_admin"
        }
      end
  end
end
