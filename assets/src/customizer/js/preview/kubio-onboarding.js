import domready from "domready";

let $ = jQuery;
const {getStartedData, kubio_front_set_predesign_nonce, kubio_onboarding_disable_notice_nonce} = window.parent.colibri_Customizer_Data;

function installHomepage({AI = false, callback}) {
    wp.ajax
        .post(getStartedData.theme_prefix + "front_set_predesign", {
            index: 0,
            AI: AI ? "yes" : "no",
            nonce: kubio_front_set_predesign_nonce,
            source: AI ? 'customizer-ai' : 'customizer-frontpage'
        })
        .done(() => {
            if (callback) {
                callback()
            }
            window.top.document.querySelector('.kubio-open-editor-panel-button').click()
        });
}

function showOnboardingModal() {
    const modal = window.top.document.querySelector('.kubio-onboarding');
    if (!modal) {
        return;
    }

    window.top.document.querySelector('.wp-customizer').appendChild(modal);
    modal.classList.add('stay-on-top');

    const handleClose = () => {
        wp.ajax.post("kubio_onboarding_disable_notice", {_wpnonce: kubio_onboarding_disable_notice_nonce});
        modal.remove();
    }

    const closeButtons = modal.querySelectorAll('.kubio-onboarding__dismiss');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', handleClose)
    })

    const actionButtons = modal.querySelectorAll('.kubio-onboarding [data-action]');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.dataset.action;

            actionButtons.forEach(button => {
                if (action !== 'continue') {
                    button.setAttribute('disabled', 'true');
                }
            })

            switch (action) {
                case 'continue':
                    const action = window.top.document.querySelector('input[name="kubio-onboarding-action"]:checked').getAttribute('value');

                    if (action === 'kubio-install-new-homepage') {
                        modal.classList.remove('kubio-step-1--active');
                        modal.classList.add('kubio-step-2--active');
                    } else {
                        handleClose();
                    }

                    break;

                case 'generate':
                    installHomepage({AI: true, callback: () => $(modal).fadeOut(100, () => modal.remove())});
                    break;

                case 'default' :
                    installHomepage({AI: false, callback: () => $(modal).fadeOut(100, () => modal.remove())});
                    break;

            }
        })
    })
}


domready(function () {

    setTimeout(() => {
        showOnboardingModal();
    }, 500)

})








