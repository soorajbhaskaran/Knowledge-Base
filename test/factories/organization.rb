# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Name.name[0..14] }
    password { "password12345" }
    is_password_protection_enabled { false }
  end
end
