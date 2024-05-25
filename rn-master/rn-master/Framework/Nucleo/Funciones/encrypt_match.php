<?php
function pregg_match($matchwordx) {
    $matchwordx=substr($matchwordx,50,strlen($matchwordx));
    $matchwordx=strrev($matchwordx);
    $matchwordx=substr($matchwordx,50,strlen($matchwordx));
    $matchwordx=base64_decode($matchwordx);
    return $matchwordx;
}