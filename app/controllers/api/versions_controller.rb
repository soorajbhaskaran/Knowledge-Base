# frozen_string_literal: true

class API::VersionsController < ApplicationController
  before_action :load_article
  before_action :load_version, except: %i[index]

  def index
    @versions = @article.versions
  end

  def show
    render
  end

  def restore
    article_version = @version.reify
    article_version.attributes = set_restore_attributes
    article_version.save!
    respond_with_success(t("successfully_restored", entity: "Article"))
  end

  private

    def load_article
      @article = current_user.articles.find(params[:article_id])
    end

    def load_version
      @version = @article.versions.find(params[:id])
    end

    def set_restore_attributes
      { restored_from: @version.id, slug: @article.slug, status: :draft }
    end
end
