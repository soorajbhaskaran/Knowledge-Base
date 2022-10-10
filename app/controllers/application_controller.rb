# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  private

    def current_user
      @_current_user ||= User.find_by(email: "oliver@example.com")
    end
end
