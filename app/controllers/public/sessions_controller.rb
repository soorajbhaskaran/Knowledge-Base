# frozen_string_literal: true

class Public::SessionsController < ApplicationController
  def create
    @preference = Preference.all.first
    unless @preference.reload.authenticate(login_params[:password])
      respond_with_error(t("session.incorrect_credentials"), :unauthorized)
    end
  end

  private

    def login_params
      params.require(:session).permit(:password)
    end
end
