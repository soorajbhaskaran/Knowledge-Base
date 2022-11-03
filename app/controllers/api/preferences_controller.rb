# frozen_string_literal: true

class API::PreferencesController < ApplicationController
  def show
    render json: { preference: preference }
  end

  def update
    preference.update!(preference_params)
    respond_with_success(t("successfully_updated", entity: "Your preference"))
  end

  private

    def preference_params
      params.require(:preference).permit(:name, :password, :is_password_protection_enabled)
    end
end
