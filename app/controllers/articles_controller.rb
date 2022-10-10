# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    @articles = current_user.articles.includes(:category)
  end
end
