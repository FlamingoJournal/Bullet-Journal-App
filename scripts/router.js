// const router = {};
// export default router;

export const router = {};
/**
 * Updates page display and information based on the state passed into the function.
 * @todo Implement this function
 */
router.setState = function switchState(state) {
    const body = document.querySelector("body");
    switch (state.page) {
        case 'home': {
            body.id = "home";
            
            break;
        }
        default: {
            break;
        }
    }
};
