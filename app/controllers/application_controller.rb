# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Authenticable

  private

    def current_user
      @_current_user ||= User.find_by(email: "oliver@example.com")
    end

    def preference
      @_preference ||= Preference.first
    end

    def check_password_presence
      if Preference.first.is_password_protection_enabled
        authenticate_end_user_using_x_auth_token
      end
    end
end
