# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    redirection.present? ? redirect_to_path : render
  end

  private

    def redirection
      current_user.redirections.find_by(from_path: params[:path])
    end

    def redirect_to_path
      redirect_to("/#{redirection.to_path}")
    end
end
