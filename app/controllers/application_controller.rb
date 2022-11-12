# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include APIResponders
  include APIRescuable
  include Authenticable

  private

    def current_organization
      @_current_organization ||= Organization.first
    end

    def current_user
      @_current_user ||= current_organization.users.first
    end

    def check_password_presence
      if Organization.first.is_password_protection_enabled
        authenticate_end_user_using_x_auth_token
      end
    end
end
