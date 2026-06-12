function openModal(){
    document.getElementById("modal").classList.add("active");
}

function closeModal(){
    document.getElementById("modal").classList.remove("active");
}


function showError(fieldId, message) {
    document.getElementById(fieldId).classList.add("input-error");
    document.getElementById(fieldId + "-error").textContent = message;
}

function clearError(fieldId) {
    document.getElementById(fieldId).classList.remove("input-error");
    document.getElementById(fieldId + "-error").textContent = "";
}



function validatePhone() {
    const value = document.getElementById("phone").value.trim();
    const cleaned = value.replace(/\s/g, "");
    if (!/^\+961\d{7,8}$/.test(cleaned)) {
        showError("phone", "Please enter a valid Lebanese number e.g. +961 81 460 448");
        return false;
    }
    clearError("phone");
    return true;
}




function validateEmail() {
    const value = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        showError("email", "Please enter a valid email address");
        return false;
    }
    clearError("email");
    return true;
}

function validatePassword() {
    const value = document.getElementById("password").value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(value)) {
        showError("password", "Min 8 chars with uppercase, lowercase, number & special character (@$!%*?&)");
        return false;
    }
    clearError("password");
    return true;
}


function validateFirstName() {
    const value = document.getElementById("firstName").value.trim();
    if (value.length === 0) {
        showError("firstName", "First name is required");
        return false;
    } else if (value.length > 20) {
        showError("firstName", "Max 20 characters");
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError("firstName", "First name must contain letters only");
        return false;
    }
    clearError("firstName");
    return true;
}


function validateLastName() {
    const value = document.getElementById("lastName").value.trim();
    if (value.length === 0) {
        showError("lastName", "Last name is required");
        return false;
    } else if (value.length > 20) {
        showError("lastName", "Max 20 characters");
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError("lastName", "Last name must contain letters only");
        return false;
    }
    clearError("lastName");
    return true;
}


function submitSignup() {

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isPhoneValid = validatePhone(); 


    if (isEmailValid && isPasswordValid && isNameValid && isLastNameValid && isPhoneValid) {
        const user = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value.trim() 
        };
        localStorage.setItem("user", JSON.stringify(user));
        closeModal();
        alert("Account created successfully!");
    }
}


function openPaymentModal() {
    document.getElementById("paymentModal").classList.add("active");
    
    document.getElementById("cardNumber").addEventListener("input", function() {
        let val = this.value.replace(/\D/g, "").substring(0, 16);
        this.value = val.match(/.{1,4}/g)?.join(" ") || "";
    });

    document.getElementById("expiry").addEventListener("input", function() {
        let val = this.value.replace(/\D/g, "").substring(0, 4);
        if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
        this.value = val;
    });
}


function scrollToLogin() {
    const loginSection = document.getElementById("loginSection");
    loginSection.scrollIntoView({ behavior: "smooth" });
    loginSection.style.transition = "background 0.5s";
    loginSection.style.width = "580px";
    loginSection.style.background = "rgba(217, 217, 239,0.4)";  
    setTimeout(function() {
        loginSection.style.background = "transparent";
    }, 1500);
}


function validateLoginEmail() {
    const value = document.getElementById("loginEmail").value.trim();
    if (value.length === 0) {
        showError("loginEmail", "Email is required");
        return false;
    }
    clearError("loginEmail");
    return true;
}

function validateLoginPassword() {
    const value = document.getElementById("loginPassword").value;
    if (value.length === 0) {
        showError("loginPassword", "Password is required");
        return false;
    }
    clearError("loginPassword");
    return true;
}

function login() {
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();

    if (!isEmailValid || !isPasswordValid) return;

    const enteredEmail = document.getElementById("loginEmail").value.trim();
    const enteredPassword = document.getElementById("loginPassword").value;
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No account found. Please create an account first.");
        return;
    }

    if (enteredEmail === savedUser.email && enteredPassword === savedUser.password) {
        document.getElementById("loginEmail").value = "";
        document.getElementById("loginPassword").value = "";
        openPaymentModal();
    } else {
        alert("Incorrect email or password.");
    }
}


function validateStreet() {
    const value = document.getElementById("street").value.trim();
    if (value.length === 0) {
        showError("street", "Street address is required");
        return false;
    }
    clearError("street");
    return true;
}

function validateCity() {
    const value = document.getElementById("city").value.trim();
    if (value.length === 0) {
        showError("city", "City is required");
        return false;
    }
    clearError("city");
    return true;
}

function validateCountry() {
    const value = document.getElementById("country").value.trim();
    if (value.length === 0) {
        showError("country", "Country is required");
        return false;
    }
    clearError("country");
    return true;
}

function validateZip() {
    const value = document.getElementById("zip").value.trim();
    if (!/^\d{4,10}$/.test(value)) {
        showError("zip", "Please enter a valid zip code");
        return false;
    }
    clearError("zip");
    return true;
}


function submitAddress() {
    const isStreetValid = validateStreet();
    const isCityValid = validateCity();
    const isCountryValid = validateCountry();
    const isZipValid = validateZip();

    if (isStreetValid && isCityValid && isCountryValid && isZipValid) {

        document.getElementById("addressSection").style.display = "none";
        document.getElementById("paymentSection").style.display = "block";
    }
}

function goBackToAddress() {

    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("addressSection").style.display = "block";
}


function closePaymentModal() {
    document.getElementById("paymentModal").classList.remove("active");
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("addressSection").style.display = "block";
}


function validateCardName() {
    const value = document.getElementById("cardName").value.trim();
    if (value.length === 0) {
        showError("cardName", "Cardholder name is required");
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError("cardName", "Cardholder name must contain letters only");
        return false;
    }
    clearError("cardName");
    return true;
}



function validateCardNumber() {
    const value = document.getElementById("cardNumber").value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(value)) {
        showError("cardNumber", "Please enter a valid 16-digit card number");
        return false;
    }
    clearError("cardNumber");
    return true;
}

function validateExpiry() {
    const value = document.getElementById("expiry").value;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
        showError("expiry", "Please enter a valid date (MM/YY)");
        return false;
    }
    clearError("expiry");
    return true;
}



function validateCVV() {
    const value = document.getElementById("cvv").value;
    if (!/^\d{3}$/.test(value)) {
        showError("cvv", "CVV must be 3 digits");
        return false;
    }
    clearError("cvv");
    return true;
}


function openSuccessModal() {
    document.getElementById("successModal").classList.add("active");
}

function closeSuccessModal() {
    document.getElementById("successModal").classList.remove("active");
}


function submitPayment() {
    const isCardNameValid = validateCardName();
    const isCardNumberValid = validateCardNumber();
    const isExpiryValid = validateExpiry();
    const isCVVValid = validateCVV();

    if (isCardNameValid && isCardNumberValid && isExpiryValid && isCVVValid) {

        const btn = document.getElementById("payNowBtn");
        btn.value = "Processing...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        setTimeout(function() {
            btn.value = "Pay Now";
            btn.disabled = false;
            btn.style.opacity = "1";
            closePaymentModal();
            openSuccessModal();
        }, 2000);
    }
}