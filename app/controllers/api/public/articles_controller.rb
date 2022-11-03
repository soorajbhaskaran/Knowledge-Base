# frozen_string_literal: true

class API::Public::ArticlesController < ApplicationController
  before_action :load_article!, only: [:show]
  before_action :check_password_presence, only: [:show]

  def show
  end

  private

    def load_article!
      @article = Article.where(status: "published").find_by!(slug: params[:slug])
    end
end