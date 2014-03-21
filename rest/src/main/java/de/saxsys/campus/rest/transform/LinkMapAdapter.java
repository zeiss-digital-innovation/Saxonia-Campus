package de.saxsys.campus.rest.transform;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.XmlAdapter;

import org.eclipse.persistence.oxm.annotations.XmlVariableNode;

public class LinkMapAdapter extends XmlAdapter<LinkMapAdapter.AdaptedMap, Map<String, URI>> {

	public static class AdaptedMap {
		@XmlVariableNode("key")
		@XmlElement(name = "_links")
		List<AdaptedEntry> entries = new ArrayList<>();
	}

	public static class AdaptedEntry {
		@XmlTransient
		public String key;
		@XmlValue
		public URI value;
	}

	@Override
	public AdaptedMap marshal(Map<String, URI> map) throws Exception {
		AdaptedMap adaptedMap = new AdaptedMap();
		for (Entry<String, URI> entry : map.entrySet()) {
			AdaptedEntry adaptedEntry = new AdaptedEntry();
			adaptedEntry.key = entry.getKey();
			adaptedEntry.value = entry.getValue();
			adaptedMap.entries.add(adaptedEntry);
		}
		return adaptedMap;
	}

	@Override
	public Map<String, URI> unmarshal(AdaptedMap adaptedMap) throws Exception {
		List<AdaptedEntry> adaptedEntries = adaptedMap.entries;
		Map<String, URI> map = new HashMap<>(adaptedEntries.size());
		for (AdaptedEntry adaptedEntry : adaptedEntries) {
			map.put(adaptedEntry.key, adaptedEntry.value);
		}
		return map;
	}

}
