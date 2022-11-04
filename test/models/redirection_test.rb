# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = build(:redirection)
  end

  def test_from_path_should_be_present
    @redirection.from_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path can't be blank"
  end

  def test_to_path_should_be_present
    @redirection.to_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To path can't be blank"
  end

  def test_from_path_should_be_unique
    @redirection.save!
    test_redirection = @redirection.dup
    assert_not test_redirection.valid?
    assert_includes test_redirection.errors.full_messages, "From path has already been taken"
  end

  def test_from_path_and_to_path_cannot_be_same
    @redirection.from_path = @redirection.to_path
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path " + t("redirections.not_same")
  end

  def test_redirection_loop
    @redirection.save!
    test_redirection = build(:redirection, to_path: @redirection.from_path)
    assert_not test_redirection.valid?
    assert_includes test_redirection.errors.full_messages, "To path " + t("redirections.not_cyclic")
  end

  def test_redirection_not_possible_to_admin
    @redirection.to_path = "/admin"
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To path " + t("redirections.not_cyclic")
  end
end
