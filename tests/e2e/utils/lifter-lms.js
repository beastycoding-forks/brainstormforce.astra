import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../utils/set-browser-viewport';
export const columnsWidth = async ( width ) => {
    @media (max-width: 768px) {
        if ( width === 1 ) {
            width = '100%';
        }
        if ( width === 2 ) {
            width = '50%';
        }
        if ( width === 3 ) {
            width = '33.33333%';
        }
        if ( width === 4 ) {
        width = '25%';
        }
    }
};
