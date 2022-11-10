# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include APIResponders
  include APIRescuable
  include Authenticable

  private

    def organization
      @_organization ||= Organization.first
    end

    def current_user
      @_current_user ||= organization.users.find_by(email: "oliver@example.com")
    end

    def check_password_presence
      if Organization.first.is_password_protection_enabled
        authenticate_end_user_using_x_auth_token
      end
    end
end
