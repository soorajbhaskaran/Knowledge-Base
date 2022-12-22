# frozen_string_literal: true

class API::UsersController < ApplicationController
  before_action :load_user, only: [:show, :update]

  def show
    render
  end

  def update
    @user.update! user_params
  end

  private

    def user_params
      params.require(:user).permit(:info)
    end

    def load_user
      @user = current_user
    end
end
