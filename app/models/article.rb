# frozen_string_literal: true

require "sidekiq/api"

class Article < ApplicationRecord
  MAX_ARTICLE_TITLE_LENGTH = 50
  MAX_ARTICLE_CONTENT_LENGTH = 10000
  MAX_ARTICLES_PER_PAGE = 9

  enum status: { draft: "draft", published: "published" }

  belongs_to :category, counter_cache: true
  belongs_to :author, foreign_key: "author_id", class_name: "User"
  has_many :visits, dependent: :destroy
  has_many :schedules, dependent: :destroy

  validates :title, presence: true, length: { maximum: MAX_ARTICLE_TITLE_LENGTH }
  validates :content, presence: true, length: { maximum: MAX_ARTICLE_CONTENT_LENGTH }
  validates :slug, uniqueness: true, if: -> { slug.present? }
  validate :slug_not_changed

  before_create :update_published_date_when_status_changes_to_published, :set_slug_if_article_is_published
  before_update :update_published_date_when_status_changes_to_published, :set_slug_if_article_is_published
  before_update :remove_schedule
  before_destroy :remove_job_from_sidekiq, prepend: true

  acts_as_list scope: :category
  has_paper_trail on: [:update], ignore: [:position]
  paginates_per MAX_ARTICLES_PER_PAGE

  def preserve_slug_and_add_restore_attributes(slug)
    self.attributes = { slug: slug, restored_from: self.updated_at, status: :draft }
    self
  end

  private

    def set_slug_if_article_is_published
      set_slug if published? && slug.blank?
    end

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug =
      Article.where(status: :published).where(regex_pattern, "#{title_slug}$|#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end

    def self.of_status(progress)
      if progress == :draft
        status = draft.order("updated_at DESC")
      else
        status = published.order("updated_at DESC")
      end
      status
    end

    def update_published_date_when_status_changes_to_published
      self.published_date = Time.zone.now if published?
    end

    def remove_job_from_sidekiq
      existing_schedule = self.schedules.find_by(executed: false)
      return unless existing_schedule.present?

      scheduled = Sidekiq::ScheduledSet.new
      scheduled.scan("ArticleUpdateWorker").each do |job|
        job.delete if job.args.first == existing_schedule.id
      end
    end

    def remove_schedule
      schedule = self.schedules.find_by(executed: false)
      return unless schedule.present?

      remove_job_from_sidekiq
      schedule.destroy!
    end
end
