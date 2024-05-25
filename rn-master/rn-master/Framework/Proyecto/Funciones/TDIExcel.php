<?php
	class TDIExcelXLSX{
		private $_contentType =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
			<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
				<Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
				<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
				<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
				<Default Extension="xml" ContentType="application/xml"/>
				<Default Extension="vml" ContentType="application/vnd.openxmlformats-officedocument.vmlDrawing"/>
				<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
				<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
				<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
				<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
				<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
			</Types>';
		
		private $_relationship =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
			<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
				<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
				<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
				<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
			</Relationships>';
		
		private $_workbookRelationship =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
			<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
				<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
				<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
				<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
				<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
			</Relationships>';
		
		private $_app;
		
		private $_core;
		
		private $_theme =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
			<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">
				<a:themeElements>
					<a:clrScheme name="Office">
						<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>
						<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>
						<a:dk2><a:srgbClr val="1F497D"/></a:dk2>
						<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>
						<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>
						<a:accent2><a:srgbClr val="C0504D"/></a:accent2>
						<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>
						<a:accent4><a:srgbClr val="8064A2"/></a:accent4>
						<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>
						<a:accent6><a:srgbClr val="F79646"/></a:accent6>
						<a:hlink>
							<a:srgbClr val="0000FF"/>
						</a:hlink>
						<a:folHlink>
							<a:srgbClr val="800080"/>
						</a:folHlink>
					</a:clrScheme>
					<a:fontScheme name="Office">
						<a:majorFont>
							<a:latin typeface="Cambria"/>
							<a:ea typeface=""/>
							<a:cs typeface=""/>
							<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>
							<a:font script="Hang" typeface="맑은 고딕"/>
							<a:font script="Hans" typeface="宋体"/>
							<a:font script="Hant" typeface="新細明體"/>
							<a:font script="Arab" typeface="Times New Roman"/>
							<a:font script="Hebr" typeface="Times New Roman"/>
							<a:font script="Thai" typeface="Tahoma"/>
							<a:font script="Ethi" typeface="Nyala"/>
							<a:font script="Beng" typeface="Vrinda"/>
							<a:font script="Gujr" typeface="Shruti"/>
							<a:font script="Khmr" typeface="MoolBoran"/>
							<a:font script="Knda" typeface="Tunga"/>
							<a:font script="Guru" typeface="Raavi"/>
							<a:font script="Cans" typeface="Euphemia"/>
							<a:font script="Cher" typeface="Plantagenet Cherokee"/>
							<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>
							<a:font script="Tibt" typeface="Microsoft Himalaya"/>
							<a:font script="Thaa" typeface="MV Boli"/>
							<a:font script="Deva" typeface="Mangal"/>
							<a:font script="Telu" typeface="Gautami"/>
							<a:font script="Taml" typeface="Latha"/>
							<a:font script="Syrc" typeface="Estrangelo Edessa"/>
							<a:font script="Orya" typeface="Kalinga"/>
							<a:font script="Mlym" typeface="Kartika"/>
							<a:font script="Laoo" typeface="DokChampa"/>
							<a:font script="Sinh" typeface="Iskoola Pota"/>
							<a:font script="Mong" typeface="Mongolian Baiti"/>
							<a:font script="Viet" typeface="Times New Roman"/>
							<a:font script="Uigh" typeface="Microsoft Uighur"/>
							<a:font script="Geor" typeface="Sylfaen"/>
						</a:majorFont>
						<a:minorFont>
							<a:latin typeface="Calibri"/>
							<a:ea typeface=""/>
							<a:cs typeface=""/>
							<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>
							<a:font script="Hang" typeface="맑은 고딕"/>
							<a:font script="Hans" typeface="宋体"/>
							<a:font script="Hant" typeface="新細明體"/>
							<a:font script="Arab" typeface="Arial"/>
							<a:font script="Hebr" typeface="Arial"/>
							<a:font script="Thai" typeface="Tahoma"/>
							<a:font script="Ethi" typeface="Nyala"/>
							<a:font script="Beng" typeface="Vrinda"/>
							<a:font script="Gujr" typeface="Shruti"/>
							<a:font script="Khmr" typeface="DaunPenh"/>
							<a:font script="Knda" typeface="Tunga"/>
							<a:font script="Guru" typeface="Raavi"/>
							<a:font script="Cans" typeface="Euphemia"/>
							<a:font script="Cher" typeface="Plantagenet Cherokee"/>
							<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>
							<a:font script="Tibt" typeface="Microsoft Himalaya"/>
							<a:font script="Thaa" typeface="MV Boli"/>
							<a:font script="Deva" typeface="Mangal"/>
							<a:font script="Telu" typeface="Gautami"/>
							<a:font script="Taml" typeface="Latha"/>
							<a:font script="Syrc" typeface="Estrangelo Edessa"/>
							<a:font script="Orya" typeface="Kalinga"/>
							<a:font script="Mlym" typeface="Kartika"/>
							<a:font script="Laoo" typeface="DokChampa"/>
							<a:font script="Sinh" typeface="Iskoola Pota"/>
							<a:font script="Mong" typeface="Mongolian Baiti"/>
							<a:font script="Viet" typeface="Arial"/>
							<a:font script="Uigh" typeface="Microsoft Uighur"/>
							<a:font script="Geor" typeface="Sylfaen"/>
						</a:minorFont>
					</a:fontScheme>
					<a:fmtScheme name="Office">
						<a:fillStyleLst>
							<a:solidFill>
								<a:schemeClr val="phClr"/>
							</a:solidFill>
							<a:gradFill rotWithShape="1">
								<a:gsLst>
									<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>
									<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>
									<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>
								</a:gsLst>
								<a:lin ang="16200000" scaled="1"/>
							</a:gradFill>
							<a:gradFill rotWithShape="1">
								<a:gsLst>
									<a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs>
									<a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs>
									<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs>
								</a:gsLst>
								<a:lin ang="16200000" scaled="0"/>
							</a:gradFill>
						</a:fillStyleLst>
						<a:lnStyleLst>
							<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">
								<a:solidFill>
									<a:schemeClr val="phClr">
										<a:shade val="95000"/>
										<a:satMod val="105000"/>
									</a:schemeClr>
								</a:solidFill>
								<a:prstDash val="solid"/>
							</a:ln>
							<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr">
								<a:solidFill>
									<a:schemeClr val="phClr"/>
								</a:solidFill>
								<a:prstDash val="solid"/>
							</a:ln>
							<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr">
								<a:solidFill>
									<a:schemeClr val="phClr"/>
								</a:solidFill>
								<a:prstDash val="solid"/>
							</a:ln>
						</a:lnStyleLst>
						<a:effectStyleLst>
							<a:effectStyle>
								<a:effectLst>
									<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0">
										<a:srgbClr val="000000">
											<a:alpha val="38000"/>
										</a:srgbClr>
									</a:outerShdw>
								</a:effectLst>
							</a:effectStyle>
							<a:effectStyle>
								<a:effectLst>
									<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0">
										<a:srgbClr val="000000">
											<a:alpha val="35000"/>
										</a:srgbClr>
									</a:outerShdw>
								</a:effectLst>
							</a:effectStyle>
							<a:effectStyle>
								<a:effectLst>
									<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0">
										<a:srgbClr val="000000">
											<a:alpha val="35000"/>
										</a:srgbClr>
									</a:outerShdw>
								</a:effectLst>
								<a:scene3d>
									<a:camera prst="orthographicFront">
										<a:rot lat="0" lon="0" rev="0"/>
									</a:camera>
									<a:lightRig rig="threePt" dir="t">
										<a:rot lat="0" lon="0" rev="1200000"/>
									</a:lightRig>
								</a:scene3d>
								<a:sp3d>
									<a:bevelT w="63500" h="25400"/>
								</a:sp3d>
							</a:effectStyle>
						</a:effectStyleLst>
						<a:bgFillStyleLst>
							<a:solidFill>
								<a:schemeClr val="phClr"/>
							</a:solidFill>
							<a:gradFill rotWithShape="1">
								<a:gsLst>
									<a:gs pos="0">
										<a:schemeClr val="phClr">
											<a:tint val="40000"/>
											<a:satMod val="350000"/>
										</a:schemeClr>
									</a:gs>
									<a:gs pos="40000">
										<a:schemeClr val="phClr">
											<a:tint val="45000"/>
											<a:shade val="99000"/>

											<a:satMod val="350000"/>
										</a:schemeClr>
									</a:gs>
									<a:gs pos="100000">
										<a:schemeClr val="phClr">
											<a:shade val="20000"/>
											<a:satMod val="255000"/>
										</a:schemeClr>
									</a:gs>
								</a:gsLst>
								<a:path path="circle">
									<a:fillToRect l="50000" t="-80000" r="50000" b="180000"/>
								</a:path>
							</a:gradFill>
							<a:gradFill rotWithShape="1">
								<a:gsLst>
									<a:gs pos="0">
										<a:schemeClr val="phClr">
											<a:tint val="80000"/>
											<a:satMod val="300000"/>
										</a:schemeClr>
									</a:gs>
									<a:gs pos="100000">
										<a:schemeClr val="phClr">
											<a:shade val="30000"/>
											<a:satMod val="200000"/>
										</a:schemeClr>
									</a:gs>
								</a:gsLst>
								<a:path path="circle">
									<a:fillToRect l="50000" t="50000" r="50000" b="50000"/>
								</a:path>
							</a:gradFill>
						</a:bgFillStyleLst>
					</a:fmtScheme>
				</a:themeElements>
				<a:objectDefaults/>
				<a:extraClrSchemeLst/>
			</a:theme>';
		
		private $_sharedStrings;
		
		private $_style =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
			<styleSheet xml:space="preserve" xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
				<numFmts count="0"/>
				<fonts count="2">
					<font>
						<b val="0"/>
						<i val="0"/>
						<strike val="0"/>
						<u val="none"/>
						<sz val="11"/>
						<color rgb="FF000000"/>
						<name val="Calibri"/>
					</font>
					<font>
						<b val="1"/>
						<i val="0"/>
						<strike val="0"/>
						<u val="none"/>
						<sz val="11"/>
						<color rgb="FF000000"/>
						<name val="Calibri"/>
					</font>
				</fonts>
				<fills count="3">
					<fill>
						<patternFill patternType="none"/>
					</fill>
					<fill>
						<patternFill patternType="gray125">
							<fgColor rgb="FFFFFFFF"/>
							<bgColor rgb="FF000000"/>
						</patternFill>
					</fill>
					<fill>
						<gradientFill type="linear" degree="90">
							<stop position="0">
								<color rgb="FFA0A0A0"/>
							</stop>
							<stop position="1">
								<color rgb="FFFFFFFF"/>
							</stop>
						</gradientFill>
					</fill>
				</fills>
				<borders count="2">
					<border/>
					<border>
						<top style="thin">
							<color rgb="FF000000"/>
						</top>
					</border>
				</borders>
				<cellStyleXfs count="1">
					<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
				</cellStyleXfs>
				<cellXfs count="5">
					<!-- s="0" -->
					<xf xfId="0" fontId="0" numFmtId="0" fillId="0" borderId="0" applyFont="0" applyNumberFormat="0" applyFill="0" applyBorder="0" applyAlignment="0">
						<alignment horizontal="general" vertical="bottom" textRotation="0" wrapText="false" shrinkToFit="false"/>
					</xf>

					<!-- s="1" -->
					<xf xfId="0" fontId="1" numFmtId="0" fillId="2" borderId="1" applyFont="1" applyNumberFormat="0" applyFill="1" applyBorder="1" applyAlignment="1">
						<alignment horizontal="left" vertical="bottom" textRotation="0" wrapText="1" shrinkToFit="false"/>
					</xf>

					<!-- s="2" -->
					<xf xfId="0" fontId="1" numFmtId="0" fillId="2" borderId="1" applyFont="1" applyNumberFormat="0" applyFill="1" applyBorder="1" applyAlignment="1">
						<alignment horizontal="left" vertical="bottom" textRotation="0" wrapText="1" shrinkToFit="false"/>
					</xf>

					<!-- s="3" -->
					<xf xfId="0" fontId="1" numFmtId="0" fillId="2" borderId="1" applyFont="1" applyNumberFormat="0" applyFill="1" applyBorder="1" applyAlignment="1">
						<alignment horizontal="left" vertical="bottom" textRotation="0" wrapText="1" shrinkToFit="false"/>
					</xf>

					<!-- s="4" Formato numérico -->
					<xf xfId="0" fontId="0" numFmtId="4" fillId="0" borderId="0" applyFont="0" applyNumberFormat="1" applyFill="0" applyBorder="0" applyAlignment="1">
						<alignment horizontal="right" vertical="bottom" textRotation="0" wrapText="1" shrinkToFit="false"/>
					</xf>
				</cellXfs>
				<cellStyles count="1">
					<cellStyle name="Normal" xfId="0" builtinId="0"/>
				</cellStyles>
				<dxfs count="0"/>
				<tableStyles defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotTableStyle1"/>
			</styleSheet>';
		
		private $_workbook;
		
		private $_worksheet;
		
		private $_worksheetRelationship =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
			<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>';
		
		private $_sizeColumn = array(
			'descrip'=> 50,
			'descripred'=>30,
			'date' => 20,
			'number'=> 20,
			'information' => 100
		);
		
		private $_filename = '';
		
		private $_letters = array();
		
		// Objeto que permite crear el zip para el formato xlsx
		private $_objZip;
		
		// Archivo excel temporal
		private $_excelfile;
		
		public function __construct($filename){
			$this->_app =
				'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
				<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" >
					<Application>Microsoft Excel</Application>
					<DocSecurity>0</DocSecurity>
					<ScaleCrop>false</ScaleCrop>
					<HeadingPairs>
						<vt:vector size="2" baseType="variant">
							<vt:variant>
								<vt:lpstr>Worksheets</vt:lpstr>
							</vt:variant>
							<vt:variant>
								<vt:i4>1</vt:i4>
							</vt:variant>
						</vt:vector>
					</HeadingPairs>
					<TitlesOfParts>
						<vt:vector size="1" baseType="lpstr">
							<vt:lpstr>'.$filename.'</vt:lpstr>
						</vt:vector>
					</TitlesOfParts>
					<Company>Microsoft Corporation</Company>
					<Manager></Manager>
					<LinksUpToDate>false</LinksUpToDate>
					<SharedDoc>false</SharedDoc>
					<HyperlinksChanged>false</HyperlinksChanged>
					<AppVersion>12.0000</AppVersion>
				</Properties>';
			
			$author = 'SIAT';
			$today = getdate();
			$year = $today['year'];
			$month = $today['mon'];
			$day = $today['mday'];
			$hour = $today['hours'];
			$min = $today['minutes'];
			$sec = $today['seconds'];
			
			$date = $year.'-'.
				(strlen($month) == 2 ? $month : '0'.$month ).'-'.
				(strlen($day) == 2 ? $day : '0'.$day ).'T'.
				(strlen($hour) == 2 ? $hour : '0'.$hour ).':'.
				(strlen($min) == 2 ? $min : '0'.$min ).':'.
				(strlen($sec) == 2 ? $sec : '0'.$hour ).'-03:00';
			
			$this->_core =
				'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
				<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
					<dc:creator>'.$author.'</dc:creator>
					<cp:lastModifiedBy>'.$author.'</cp:lastModifiedBy>
					<dcterms:created xsi:type="dcterms:W3CDTF">'.$date.'</dcterms:created>
					<dcterms:modified xsi:type="dcterms:W3CDTF">'.$date.'</dcterms:modified>
					<dc:title></dc:title>
					<dc:description></dc:description>
					<dc:subject></dc:subject>
					<cp:keywords></cp:keywords>
					<cp:category></cp:category>
				</cp:coreProperties>';
			
			$this->_workbook =
				'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
				<workbook xml:space="preserve" xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
					<fileVersion appName="xl" lastEdited="4" lowestEdited="4" rupBuild="4505"/>
					<workbookPr codeName="ThisWorkbook"/>
					<bookViews>
						<workbookView 
							activeTab="0" 
							autoFilterDateGrouping="1" 
							firstSheet="0" 
							minimized="0" 
							showHorizontalScroll="1" 
							showSheetTabs="1" 
							showVerticalScroll="1" 
							tabRatio="600" 
							visibility="visible" />
					</bookViews>
					<sheets>
						<sheet name="'.substr($filename, 0, 30).'" sheetId="1" r:id="rId4"/>
					</sheets>
					<definedNames/>
					<calcPr calcId="124519" calcMode="auto" fullCalcOnLoad="0"/>
				</workbook>';
			
			$this->_filename = $filename;
			
			$this->_excelfile = @tempnam(sys_get_temp_dir(), 'phpxltmp'.$filename.rand());
			
			$this->_objZip = new ZipArchive();

			$ro = new ReflectionObject($this->_objZip);
			//$zipOverWrite = $ro->getConstant('OVERWRITE');
			$zipCreate = $ro->getConstant('CREATE');
			
			unlink($this->_excelfile);
			// Try opening the ZIP file
			if ($this->_objZip->open($this->_excelfile, $zipCreate) !== true) {
				throw new Exception("No se pudo abrir el archivo " . $this->_excelfile . " para su escritura.");
			}
		}
		
		private function initializeXLSX(){
			// Add [Content_Types].xml to ZIP file
			$this->_objZip->addFromString('[Content_Types].xml',$this->_contentType);
			
			// Add relationships to ZIP file
			$this->_objZip->addFromString('_rels/.rels',$this->_relationship);
			$this->_objZip->addFromString('xl/_rels/workbook.xml.rels',$this->_workbookRelationship);

			// Add document properties to ZIP file
			$this->_objZip->addFromString('docProps/app.xml',$this->_app);
			$this->_objZip->addFromString('docProps/core.xml',$this->_core);
			
			// Add theme to ZIP file
			$this->_objZip->addFromString('xl/theme/theme1.xml',$this->_theme);
			
			// Add stryle to ZIP file
			$this->_objZip->addFromString('xl/styles.xml',$this->_style);
			
			// Add workbook to ZIP file
			$this->_objZip->addFromString('xl/workbook.xml',$this->_workbook);
			
			// Add worksheet relationships
			$this->_objZip->addFromString('xl/worksheets/_rels/sheet_1.xml.rels',$this->_worksheetRelationship);
		}
		
		private function createLetters($cant_letras){
			$letras = array();
			for ($i = 0; $i < $cant_letras; $i++) {
				$numero = $i;
				$letra = '';
				do {
					$mod = $numero % 26;
					if($numero == $i) $mod++;
					$numero = floor($numero / 26);
					$letra = chr($mod + 64) . $letra;
				}while($numero > 0);
				$letras[] = $letra;
			}
			
			$this->_letters = $letras;
		}
		
		public function downloadExcel($sql,$parametres,$arrTitles){
			//header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
			//header("Cache-Control: no-store, no-cache, must-revalidate");
			//header("Cache-Control: post-check=0, pre-check=0", false);
			//header("Pragma: no-cache");
			//header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=ISO-8859-1');
			header('Content-Disposition: attachment; filename="'.$this->_filename.'.xlsx"');
			header('Content-type: application/txt');
			header('Content-Transfer-Encoding: binary');
			header('Content-Description: File Transfer');
			header('Content-Transfer-Encoding: binary');
			header('Cache-Control: must-revalidate');
			ob_clean();
			flush();
			
			$this->initializeXLSX();
			
			$this->createLetters(count($arrTitles));
			
			$this->addFromQuery($arrTitles,$sql,$parametres);
			
			set_time_limit(600);
			$this->_objZip->close();
			
			readfile($this->_excelfile);
			
			unlink($this->_excelfile);
		}
		
		private function addFromQuery($arrTitles,$sql,$parametres){
			$worksheetPath = 'xl/worksheets/sheet1.xml';		
			$sharedStringsPath = 'xl/sharedStrings.xml';	
			$replace_arr = array('<br />','<br/>','</br>','</ br>','<br>',"\\");
			
			$sql_cant = "SELECT COUNT(*) cant FROM (".$sql.")";

			$db_query_count = new DB_Query($sql_cant);
			$row_cant = $db_query_count->do_query($parametres);
			$total = $row_cant[0]['CANT'];
			
			$this->_sharedStrings = 
				'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
				<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
			
			$lastColumn = $this->_letters[(count($arrTitles)-1)];
			
			$lastRow = $total + 1;
			
			$this->_worksheet =
				'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
				<worksheet xml:space="preserve" xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
					<sheetPr>
						<outlinePr summaryBelow="1" summaryRight="1"/>
					</sheetPr>
					<dimension ref="A1:'.$lastColumn.$lastRow.'"/>
					<sheetViews>
						<sheetView tabSelected="1" workbookViewId="0" showGridLines="true" showRowColHeaders="1">
							<selection activeCell="'.$lastColumn.'1" sqref="'.$lastColumn.'1"/>
						</sheetView>
					</sheetViews>
					<sheetFormatPr defaultRowHeight="14.4" outlineLevelRow="0" outlineLevelCol="0"/>
					<cols>';
				
			$firstRow = '<row r="1" spans="1:'.count($arrTitles).'">';
			$countCol = 1;
			$maxCell = count($arrTitles);
			foreach($arrTitles as $reg){
				foreach($reg as $title => $typeTitle){
					$this->_sharedStrings = $this->_sharedStrings . '<si><t>'.str_replace($replace_arr,'',str_replace('>','&gt;',str_replace('<','&lt;',str_replace('&','&amp;',$title)))).'</t></si>';
					
					$this->_worksheet = $this->_worksheet . 
						'<col min="'.$countCol.'" max="'.$countCol.'" width="'.$this->_sizeColumn[$typeTitle].'" bestFit="true" customWidth="true" style="0"/>';
					
					if ($countCol == 1){
						$firstRow = $firstRow.'<c r="'.$this->_letters[($countCol - 1)].'1" s="1" t="s"><v>'.($countCol -1).'</v></c>';
					} elseif ($countCol == $maxCell) {
						$firstRow = $firstRow.'<c r="'.$this->_letters[($countCol - 1)].'1" s="3" t="s"><v>'.($countCol -1).'</v></c>';
					} else {
						$firstRow = $firstRow.'<c r="'.$this->_letters[($countCol - 1)].'1" s="2" t="s"><v>'.($countCol -1).'</v></c>';
					}
					
					$countCol++;
				}
			}
			
			$this->_worksheet = $this->_worksheet . '</cols><sheetData>'.$firstRow.'</row>';
			
			$worksheetParts = pathinfo($worksheetPath);
			$sharedStringsParts = pathinfo($sharedStringsPath);
			
			//Garantiza que el archivo temporal sea unico para evitar que se pise cuando mas de un usuario
			//descarga un excel por sistema (sobre todo cuando tarda mucho la query del excel --> emisiones)
			$ws_path_extract = @tempnam(sys_get_temp_dir(), rand()."ws".rand());
			$ss_path_extract = @tempnam(sys_get_temp_dir(), rand()."ss".rand());

			$worksheetFile = fopen($ws_path_extract, "w+");
			$sharedStringsFile = fopen($ss_path_extract, "w+");
			
			fwrite($worksheetFile, $this->_worksheet);
			fwrite($sharedStringsFile, $this->_sharedStrings."\n");
			
			$cant_fetch = 2500;
			$cociente = ceil($total / $cant_fetch);
			$inicio = 0;
			$rowIndex = 2;
			$maxSpan = count($arrTitles);
			$rowWorksheet ='';
			$rowSharedStrings ='';
			
			for($i=0 ; $i < $cociente ; $i++) {
				$inicio = $cant_fetch * $i;
				
				$query_pager = 'select t2.* from (Select t1.*, ROW_NUMBER() OVER (ORDER BY 1 asc) rn from ('.$sql.') t1 ) t2 where t2.rn > '.$inicio.' and t2.rn <='.($inicio+$cant_fetch);
				
				$db_query = new DB_Query($query_pager);
				$rows = $db_query->do_query($parametres, OCI_NUM);
				
				foreach($rows as &$row){
					$rowWorksheet = $rowWorksheet .'<row r="'.$rowIndex.'" spans="1:'.$maxSpan.'">';
					foreach($row as $key => &$value) {
						$title_col = $arrTitles[$key];
						foreach($title_col as $label => &$type_col){
							if ($value != null){
								if ($type_col == 'number') {
									$s = 's="4"'; // Aplico formato numérico
									$rowWorksheet = $rowWorksheet .'<c r="'.$this->_letters[$key].$rowIndex.'" '.$s.'><v>'.((strpos($value,',') === false) ? $value : str_replace(',','.',str_replace('.','',$value))).'</v></c>';
								} else {
									$rowWorksheet = $rowWorksheet .'<c r="'.$this->_letters[$key].$rowIndex.'" t="s"><v>'.($countCol -1).'</v></c>';
									$rowSharedStrings = $rowSharedStrings ."<si><t>".str_replace($replace_arr,'',str_replace('>','&gt;',str_replace('<','&lt;',str_replace('&','&amp;',$value))))."</t></si>";
									$countCol++;
								}
							}
							else {
								$s = ($type_col == 'number') ? 's="4"' : ''; // Aplico formato numérico (si corresponde)
								$rowWorksheet = $rowWorksheet .'<c r="'.$this->_letters[$key].$rowIndex.'" '.$s.'/>';
							}
						}
					}
					
					fwrite($worksheetFile, $rowWorksheet."</row>"."\n");
					
					if($rowSharedStrings != '') {
						fwrite($sharedStringsFile,$rowSharedStrings."\n");
					}
					
					unset($rowWorksheet);
					unset($rowSharedStrings);
					
					$rowWorksheet = '';
					$rowSharedStrings = '';
					
					$rowIndex++;
				}
				
				fflush($worksheetFile);
				fflush($sharedStringsFile);
				
				unset($query_pager);
				unset($rows);
				unset($db_query);
			}
			
			$closeWorksheet =
					'</sheetData>
					<sheetProtection 
						sheet="false" 
						objects="false" 
						scenarios="false" 
						formatCells="false" 
						formatColumns="false" 
						formatRows="false" 
						insertColumns="false" 
						insertRows="false" 
						insertHyperlinks="false" 
						deleteColumns="false" 
						deleteRows="false" 
						selectLockedCells="false" 
						sort="false" 
						autoFilter="false" 
						pivotTables="false" 
						selectUnlockedCells="false" />
					<printOptions gridLines="false" gridLinesSet="true"/>
					<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
					<pageSetup paperSize="1" orientation="default" scale="100" fitToHeight="1" fitToWidth="1"/>
					<headerFooter differentOddEven="false" differentFirst="false" scaleWithDoc="true" alignWithMargins="true">
						<oddHeader></oddHeader>
						<oddFooter></oddFooter>
						<evenHeader></evenHeader>
						<evenFooter></evenFooter>
						<firstHeader></firstHeader>
						<firstFooter></firstFooter>
					</headerFooter>
				</worksheet>';
			
			fwrite($worksheetFile, $closeWorksheet);
			ftruncate($worksheetFile, ftell($worksheetFile));
			fclose($worksheetFile);
			
			fwrite($sharedStringsFile, '</sst>');
			ftruncate($sharedStringsFile, ftell($sharedStringsFile));
			fclose($sharedStringsFile);
			
			//readfile(sys_get_temp_dir().'/'.$worksheetParts["basename"]);
			//readfile(sys_get_temp_dir().'/'.$sharedStringsParts["basename"]);
			//die();
			
			$this->_objZip->addFile($ws_path_extract,$worksheetPath);
			$this->_objZip->addFile($ss_path_extract,$sharedStringsPath);
		}
	}
?>