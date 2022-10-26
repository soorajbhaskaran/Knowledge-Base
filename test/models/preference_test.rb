# frozen_string_literal: true

require "test_helper"

class PreferenceTest < ActiveSupport::TestCase
  def setup
    @preference = build(:preference)
  end

  def test_preference_should_not_be_valid_and_saved_without_name
    @preference.name = ""
    assert_not @preference.valid?
    assert_includes @preference.errors.full_messages, "Name can't be blank"
  end

  def test_password_should_have_minimum_length
    @preference.password = "a" * (Preference::MINIMUM_PREFERENCE_PASSWORD_LENGTH - 1)
    assert_not @preference.valid?
  end

  def test_preference_password_should_contain_alphanumeric_characters
    @preference.password = "a" * Preference::MINIMUM_PREFERENCE_PASSWORD_LENGTH
    assert_not @preference.valid?
  end
end
