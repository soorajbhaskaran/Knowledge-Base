# frozen_string_literal: true

require "test_helper"

class VisitTest < ActiveSupport::TestCase
  def setup
    @visit = build(:visit)
  end

  def test_visit_should_only_be_valid_with_article
    @visit.article = nil
    assert_not @visit.valid?
  end
end
