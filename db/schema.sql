-- Database Schema for Visit Al Aqsa Crowdfunding Platform

-- Users table - stores information about registered users
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(100),
    reset_token VARCHAR(100),
    reset_token_expires TIMESTAMP WITH TIME ZONE
);

-- Applicants table - stores information about people applying to visit Al Aqsa
CREATE TABLE IF NOT EXISTS applicants (
    applicant_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    reason TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'selected', 'traveling', 'completed', 'unavailable')) DEFAULT 'pending',
    application_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    queue_position INTEGER NOT NULL,
    selected_date TIMESTAMP WITH TIME ZONE,
    travel_date TIMESTAMP WITH TIME ZONE,
    return_date TIMESTAMP WITH TIME ZONE
);

-- Contributions table - stores all contribution transactions
CREATE TABLE IF NOT EXISTS contributions (
    contribution_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    amount DECIMAL(10, 2) NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    transaction_reference VARCHAR(100),
    payment_method VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RecurringContributions table - stores recurring payment information
CREATE TABLE IF NOT EXISTS recurring_contributions (
    recurring_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    amount DECIMAL(10, 2) NOT NULL,
    frequency VARCHAR(20) CHECK (frequency IN ('monthly', 'quarterly', 'annually')) DEFAULT 'monthly',
    status VARCHAR(20) CHECK (status IN ('active', 'paused', 'cancelled')) DEFAULT 'active',
    next_billing_date TIMESTAMP WITH TIME ZONE NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE
);

-- Journeys table - stores information about funded trips
CREATE TABLE IF NOT EXISTS journeys (
    journey_id SERIAL PRIMARY KEY,
    applicant_id INTEGER NOT NULL REFERENCES applicants(applicant_id),
    status VARCHAR(20) CHECK (status IN ('planning', 'booked', 'in_progress', 'completed', 'cancelled')) DEFAULT 'planning',
    total_cost DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    departure_date TIMESTAMP WITH TIME ZONE,
    return_date TIMESTAMP WITH TIME ZONE
);

-- JourneyExpenses table - stores detailed expense information for each journey
CREATE TABLE IF NOT EXISTS journey_expenses (
    expense_id SERIAL PRIMARY KEY,
    journey_id INTEGER NOT NULL REFERENCES journeys(journey_id),
    expense_type VARCHAR(20) CHECK (expense_type IN ('flight', 'accommodation', 'food', 'transport', 'visa', 'other')),
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    receipt_url VARCHAR(255),
    expense_date TIMESTAMP WITH TIME ZONE
);

-- Testimonials table - stores testimonials from people who have completed the journey
CREATE TABLE IF NOT EXISTS testimonials (
    testimonial_id SERIAL PRIMARY KEY,
    journey_id INTEGER NOT NULL REFERENCES journeys(journey_id),
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    image_url VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FundingGoals table - stores information about funding targets
CREATE TABLE IF NOT EXISTS funding_goals (
    goal_id SERIAL PRIMARY KEY,
    target_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0,
    description VARCHAR(255) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active'
);

-- Notifications table - stores notifications for users
CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(20) CHECK (type IN ('contribution', 'application', 'selection', 'journey', 'general')),
    related_id INTEGER
);

-- PaymentLogs table - for auditing and tracking payment processing
CREATE TABLE IF NOT EXISTS payment_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    contribution_id INTEGER REFERENCES contributions(contribution_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_gateway VARCHAR(50),
    gateway_reference VARCHAR(100),
    response_code VARCHAR(50),
    response_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- UserActivities table - for audit trail
CREATE TABLE IF NOT EXISTS user_activities (
    activity_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SystemSettings table - for platform configuration
CREATE TABLE IF NOT EXISTS system_settings (
    setting_id SERIAL PRIMARY KEY,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    is_public BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description, is_public) 
VALUES 
('contribution_amount', '300', 'Default contribution amount in Rand', TRUE),
('journey_cost', '15000', 'Estimated cost for one journey in Rand', TRUE),
('queue_enabled', 'true', 'Whether the queue system is enabled', FALSE),
('applications_open', 'true', 'Whether applications are currently being accepted', TRUE)
ON CONFLICT (setting_key) DO NOTHING;
