import { useState , useEffect } from 'react';

const { __ } = wp.i18n;
const {Dashicon, Tooltip, TextControl, Button, TabPanel } = wp.components;
import { MediaUpload } from '@wordpress/block-editor';
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import astIcons from "../../../../../assets/svg/ast-social-icons"
import renderSVG from "../../../../assets/js/ast-render-svg"


let svg_icons = Object.keys( astIcons )

const ItemComponent = props => {

	let tabs = [
		{
			name: 'icon',
			title: __( 'Icon', 'astra' ),
			className: 'astra-icon-media',
		},
		{
			name: 'image',
			title: __( 'Image', 'astra' ),
			className: 'astra-image-media',
		},

	];

	const Icons = window.svgIcons;

	const [state, setState] = useState({
		open: false,
	});

	const[ selectedIcon , setSelectedIcon ] = useState(
		props.item.icon
	)

	const[ selectedImage , setSelectedImage ] = useState(
		props.item.image
	)
	
	useEffect(() => {
		setSelectedIcon( Icons[props.item.icon] );
		setSelectedImage( props.item.image );
	}, []);

	return <div className="ahfb-sorter-item" data-id={props.item.id} key={props.item.id}>
		<div className="ahfb-sorter-item-panel-header" onClick={e => {
			e.stopPropagation();
			setState((prevState => ({
				...prevState,
				open: state.open ? false : true
			})))
		}}>
			{ ( props.item.icon && "icon" === props.item.source ) &&
				<Button className="ahfb-sorter-visiblity">
					<span dangerouslySetInnerHTML={{
						__html: selectedIcon
					}}/>
				</Button>
			}

			{ ( props.item.image && "image" === props.item.source ) &&
				<Button className="ahfb-sorter-visiblity">
					<img className="ast-media-image-preview" src={selectedImage} />
				</Button>
			}

			<span className="ahfb-sorter-title"><span className='feature-label'> { props.item.label ? props.item.label : __('Featured item', 'astra') } </span></span>
			<Button className={`ast-sorter-item-expand ${props.item.enabled ? 'item-is-visible' : 'item-is-hidden'}`}
					onClick={e => {
						e.stopPropagation();
						props.cloneItem(props.item);

						const featuredItems = jQuery( e.target ).closest( '.ahfb-sorter-drop-list_item_group' ).find( '.ahfb-sorter-item' );
						featuredItems.find( '.ahfb-sorter-item-remove.hide' ).toggleClass( 'hide' );
					}}>
				<Dashicon icon="admin-page"/>
			</Button>
			<Button className={`ahfb-sorter-item-remove ${props.item.enabled ? 'item-is-visible' : 'item-is-hidden'}`} isDestructive onClick={e => {
				e.stopPropagation();
				props.removeItem(props.index);

				const featuredItems = jQuery( e.target ).closest( '.ahfb-sorter-drop-list_item_group' ).find( '.ahfb-sorter-item' );
				if( ( parseInt( featuredItems.length ) - 1 ) == 1 ) {
					featuredItems.find( '.ahfb-sorter-item-remove' ).toggleClass( 'hide' );
				}
			}}>
				<Dashicon icon="no-alt"/>
			</Button>
		</div>
		{ state.open && <div className="ahfb-sorter-item-panel-content">

			{false === props.disable && <TextControl className="ast-text-control-input" label={__('Text', 'astra')} value={props.item.label ? props.item.label : ''}
						 onChange={value => {
							 props.onChangeLabel(value, props.index);
						 }}/>
			}
			
			<TabPanel className="astra-popover-tabs astra-media-tab"
						activeClass="active-tab"
						initialTabName={ props.item.source ? props.item.source : __( 'Icon', 'astra' ) }
						tabs={ tabs }
						onSelect={ ( currentTab ) => {
							props.onChangeSource( currentTab, props.index);
						} }
						>
				{
					( tab ) => {
						let tabout;

						if ( tab.name ) {
							if ( 'icon' === tab.name ) {
								tabout = (
									<>
										<p className="ast-social-icon-picker-label">{ __( 'Icon', 'astra' ) }</p>
										<FontIconPicker
											icons={svg_icons}
											renderFunc= {renderSVG}
											theme="default"
											value={props.item.icon}
											onChange={ value => {
												props.onChangeIcon(value, props.index);
												setSelectedIcon( Icons[value] );
											} }
											isMulti={false}
											noSelectedPlaceholder= { __( 'Select Icon', 'astra' ) }
										/>
									</>
								);
							} 

							if ( 'image' === tab.name ) {

								tabout = (
									<>
										<p className="ast-social-icon-picker-label">{ __( 'Image', 'astra' ) }</p>
											{ selectedImage && <img className="astra-media-image " src={selectedImage} /> }
											<MediaUpload
												onSelect={ ( media ) => {
													props.onChangeImage( media.url, props.index);
													setSelectedImage( media.url )
												} }
												allowedTypes={ [ 'image' ] }
												value={ selectedImage }
												render={ ( { open } ) => (
													<>
														<Button className="ast-media-btn" onClick={ open }>{selectedImage ? __( 'Replace Image', 'astra' ) : __( 'Select Image', 'astra' ) }</Button>
														{ selectedImage && <Button className="ast-media-btn ast-danger-btn" 
														onClick={ () =>  {
																setSelectedImage( '' ); 
																props.onChangeImage( '' , props.index);
														} }
														> { __( 'Remove Image', 'astra' ) } </Button> }
													</>
												) }	
											/>
									</>
								);
							} 
						}
						return <div>{ tabout }</div>;
					}
				}
			</TabPanel>
		</div>}
	</div>;
};
export default ItemComponent;
