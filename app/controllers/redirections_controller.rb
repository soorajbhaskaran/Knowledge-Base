# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: [:update, :destroy]

  def index
    @redirections = current_user.redirections
  end

  def create
    redirection = current_user.redirections.new(redirection_params)
    redirection.save!
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end

    def load_redirection!
      @redirection = current_user.redirections.find_by!(id: params[:id])
    end
end
