# frozen_string_literal: true

class API::Public::ArticlesController < ApplicationController
  before_action :load_article!, :check_password_presence, only: [:show]

  def show
    render
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug], status: "published")
    end
end
