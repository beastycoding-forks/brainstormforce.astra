import { createURL} from "@wordpress/e2e-test-utils";
import { setCustomize } from '../../../utils/set-customize';
describe( 'copyright color settings in the customizer', () => {
    it( 'copyright text color should apply correctly', async () => {
        const copyrightcolor = {

            'footer-copyright-color':'rgb(248, 27, 27)',
        };

        await setCustomize( copyrightcolor );
        await page.goto( createURL( '/' ), {
        waitUntil: 'networkidle0',
        } );

        await page.evaluate( () => {
            window.scrollBy(0, window.innerHeight);
         });
        await page.waitForSelector( '.ast-footer-copyright' );

        await expect( {
            selector: '.ast-footer-copyright',
            property: 'color',
        } ).cssValueToBe(`${ copyrightcolor [ 'footer-copyright-color' ] }`,);

    });
})